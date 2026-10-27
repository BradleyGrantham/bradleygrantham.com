import pytest

from sync_content import SITE_URL, mdx_to_markdown, parse_frontmatter


def test_parse_frontmatter():
    meta, body = parse_frontmatter('---\ntitle: "A: post"\ndate: "2026-01-01"\n---\n\nHello\n')
    assert meta == {"title": "A: post", "date": "2026-01-01"}
    assert body.strip() == "Hello"


def test_parse_frontmatter_requires_frontmatter():
    with pytest.raises(ValueError):
        parse_frontmatter("Hello")


def test_chart_becomes_placeholder():
    body = 'Before\n\n<Histogram\n  title="Search times"\n  bins={[1, 2]}\n/>\n\nAfter'
    assert mdx_to_markdown(body) == "Before\n\n[Chart: Search times (see the post on the website)]\n\nAfter"


def test_video_becomes_placeholder():
    body = '<div className="aspect-video">\n  <iframe\n    title="Demo"\n  />\n</div>\n\nText'
    assert mdx_to_markdown(body) == "[Video: Demo (see the post on the website)]\n\nText"


def test_code_fences_are_left_alone():
    body = "```\n<div>not a component</div>\n```"
    assert mdx_to_markdown(body) == body


def test_relative_links_become_absolute():
    body = "![Cover](/images/cover.jpg) and [about](/about/)"
    assert mdx_to_markdown(body) == f"![Cover]({SITE_URL}/images/cover.jpg) and [about]({SITE_URL}/about/)"
