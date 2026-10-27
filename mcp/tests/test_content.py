import content


def test_posts_are_listed_newest_first_with_urls():
    posts = content.list_posts()
    assert posts, "expected at least one post in src/content/posts"
    dates = [post["date"] for post in posts]
    assert dates == sorted(dates, reverse=True)
    for post in posts:
        assert post["url"] == f"https://bradleygrantham.com/blog/{post['slug']}/"
        assert "body" not in post


def test_get_post():
    slug = content.list_posts()[0]["slug"]
    post = content.get_post(slug)
    assert post["slug"] == slug
    assert content.format_post(post).startswith(f"# {post['title']}")


def test_get_post_unknown_slug():
    assert content.get_post("no-such-post") is None
    assert content.get_post("../about") is None
    assert content.get_post("x" * 1000) is None


def test_post_bodies_have_no_jsx_or_relative_links():
    for post in content.POSTS:
        assert "<Histogram" not in post["body"]
        assert "<iframe" not in post["body"]
        assert "</div>" not in post["body"]
        assert "](/" not in post["body"]


def test_cv_falls_back_to_coming_soon():
    assert (content.CV or content.CV_COMING_SOON).strip()


def test_golf_handicap():
    assert isinstance(content.GOLF["handicap_index"], (int, float))
    assert content.GOLF["updated"]


def test_search_finds_about_text():
    results = content.search("Popsa")
    assert results[0]["title"] == "About"
    assert results[0]["url"] == content.ABOUT_URL
    assert "Popsa" in results[0]["snippet"]


def test_search_finds_posts():
    results = content.search("victory royale")
    assert results[0]["title"] == "Victory Royale Tracker"


def test_search_is_case_insensitive_and_ignores_stopwords():
    assert content.search("POPSA") == content.search("popsa")
    assert content.search("what is the") == []


def test_search_with_no_matches():
    assert content.search("xyzzy") == []


def test_search_returns_at_most_one_result_per_page_and_limit():
    results = content.search("data science model", limit=3)
    assert len(results) <= 3
    assert len({(r["url"], r["title"]) for r in results}) == len(results)


def test_snippets_are_bounded():
    for result in content.search("the model data player"):
        assert len(result["snippet"]) <= content.SNIPPET_LENGTH + 2
