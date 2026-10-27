import sys
from pathlib import Path

HERE = Path(__file__).parent
sys.path[:0] = [str(HERE.parent), str(HERE.parent / "src")]

# The tests run against the site's real content, so regenerate it first.
import sync_content  # noqa: E402

sync_content.main()
