# v2

.PHONY: help truth new-feature grep-log search-keyword log-path bump-version rebase-feature create-readme count-loc contributors-loc commit

help:
	@echo "\033[1;33mAvailable Commands:\033[0m"
	@echo "  \033[1;32mmake help\033[0m             - Show this help message"
	@echo "  \033[1;32mmake truth\033[0m            - Display commit graph"
	@echo "  \033[1;32mmake new-feature\033[0m      - Create a new feature branch"
	@echo "  \033[1;32mmake grep-log\033[0m         - Search commits by keyword"
	@echo "  \033[1;32mmake search-keyword\033[0m   - Search for changes containing a keyword"
	@echo "  \033[1;32mmake log-path\033[0m         - Display formatted log for a file/path"
	@echo "  \033[1;32mmake bump-version\033[0m     - Bump version, merge, tag, and push"
	@echo "  \033[1;32mmake rebase-feature\033[0m   - Rebase a feature branch onto develop"
	@echo "  \033[1;32mmake create-readme\033[0m    - Create a README.md (optional title via TITLE variable)"
	@echo "  \033[1;32mmake count-loc\033[0m        - Count all lines of code in the src folder"
	@echo "  \033[1;32mmake contributors-loc\033[0m  - List contributors with net LOC committed"
	@echo "  \033[1;32mmake commit\033[0m           - Add, commit, pull (rebase), and push changes"

truth:
	@echo "\033[1;34mDisplaying commit graph...\033[0m"
	@git log --graph --decorate --pretty=oneline --abbrev-commit --all --full-history

# make new-feature PROJECT=MyProject NAME=awesome-feature ID=1234
new-feature:
	@if [ -z "$(PROJECT)" ] || [ -z "$(NAME)" ] || [ -z "$(ID)" ]; then \
		echo "\033[1;31mUsage: make new-feature PROJECT=project-name NAME=feature-name ID=ticket-id\033[0m"; \
		exit 1; \
	fi
	@branch="feature/$(PROJECT)-$(NAME)-$(ID)"; \
	echo "\033[1;34mCreating branch $$branch...\033[0m"; \
	git switch -c $$branch

# make grep-log KEYWORD=danger
grep-log:
	@if [ -z "$(KEYWORD)" ]; then \
		echo "\033[1;31mUsage: make grep-log KEYWORD=keyword\033[0m"; \
		exit 1; \
	fi
	@if [ "$(KEYWORD)" = "danger" ]; then \
		echo "\033[1;31m"; \
		echo "    ✦✧        ★        ✧✦"; \
		echo "  ☆    DANGER IS LIFE     ★"; \
		echo "   ✧✦        ★        ✦✧"; \
		echo "\033[0m"; \
	fi
	@echo "\033[1;33mSearching commits for keyword: $(KEYWORD)\033[0m"; \
	git log --grep="$(KEYWORD)"

# make search-keyword KEYWORD=React18
search-keyword:
	@if [ -z "$(KEYWORD)" ]; then \
		echo "\033[1;31mUsage: make search-keyword KEYWORD=keyword\033[0m"; \
		exit 1; \
	fi
	@echo "\033[1;33mSearching for changes containing keyword: $(KEYWORD)\033[0m"; \
	git log -S"$(KEYWORD)"

# make log-path PATH_FILTER=src/components/ AUTHOR="Author Name"
log-path:
	@if [ -z "$(PATH_FILTER)" ]; then \
		echo "\033[1;31mUsage: make log-path PATH_FILTER=path/to/file [AUTHOR='Author Name']\033[0m"; \
		exit 1; \
	fi
	@echo "\033[1;33mDisplaying formatted log for path: $(PATH_FILTER)\033[0m"; \
	git log --graph --decorate --pretty=format:'%C(auto)%h %ad %d %Creset%s %C(bold blue)<%an>%Creset' --abbrev-commit --all --full-history --author="$(AUTHOR)" -- $(PATH_FILTER)

# make bump-version VERSION=2.41.3
bump-version:
	@if [ -z "$(VERSION)" ]; then \
		echo "\033[1;31mUsage: make bump-version VERSION=version-number\033[0m"; \
		exit 1; \
	fi
	@echo "\033[1;34mBumping version to $(VERSION)...\033[0m"
	@git add .
	@git commit -m "Bump version number to $(VERSION)"
	@git checkout master && git merge develop
	@git push
	@git tag $(VERSION)
	@git push origin $(VERSION)

# make rebase-feature FEATURE=feature/INDEL-yyy
rebase-feature:
	@if [ -z "$(FEATURE)" ]; then \
		echo "\033[1;31mUsage: make rebase-feature FEATURE=feature/branch-name\033[0m"; \
		exit 1; \
	fi
	@echo "\033[1;34mRebasing branch $(FEATURE) onto develop...\033[0m"
	@git checkout $(FEATURE)
	@git rebase develop
	@git push -f

# make create-readme TITLE="## My Project Title"
create-readme:
	@echo "\033[1;34mCreating README.md...\033[0m"
	@if [ -z "$(TITLE)" ]; then \
		echo "## README" > README.md; \
		echo "\033[1;33mCreated README.md with default title.\033[0m"; \
	else \
		echo "$(TITLE)" > README.md; \
		echo "\033[1;33mCreated README.md with title: $(TITLE)\033[0m"; \
	fi

count-loc:
	@if [ ! -d "src" ]; then \
		echo "\033[1;31mError: 'src' folder not found.\033[0m"; \
		exit 1; \
	fi
	@echo "\033[1;34mCounting lines of code in the src folder...\033[0m"
	@find src -type f \( -name '*.js' -o -name '*.py' -o -name '*.c' -o -name '*.cpp' -o -name '*.java' \) -exec wc -l {} +


contributors-loc:
	@echo "\033[1;34mListing contributors and their net LOC (added - removed):\033[0m"
	@for author in $$(git log --format='%aN' | sort | uniq); do \
		loc=$$(git log --author="$$author" --pretty=tformat: --numstat | \
		awk '{ add += $$1; subs += $$2 } END { print add - subs }'); \
		printf "\033[1;33m%-20s\033[0m : %s\n" "$$author" "$$loc"; \
	done | sort -k3 -n

# make commit MSG="Fixed bug in authentication flow"
commit:
	@if [ -z "$(MSG)" ]; then \
	  echo "\033[1;31mUsage: make commit MSG='your commit message'\033[0m"; \
	  exit 1; \
	fi
	@echo "\033[1;34mAdding all changes...\033[0m"
	@git add .
	@echo "\033[1;34mCommitting changes with message: $(MSG)...\033[0m"
	@git commit -m "$(MSG)"
	@echo "\033[1;34mPulling latest changes (rebase)...\033[0m"
	@git pull --rebase
	@echo "\033[1;34mPushing to remote...\033[0m"
	@git push