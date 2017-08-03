BIN = ./node_modules/.bin
SRC = $(shell find . -path ./node_modules -prune -o -name '*.js' -print)
EXAMPLE = $(shell find ./example/*.js)

lint::
	@$(BIN)/eslint $(SRC)

release-patch: lint
	@$(call release,patch)

release-minor: lint
	@$(call release,minor)

release-major: lint
	@$(call release,major)

publish:
	git push --tags origin HEAD:master
	npm publish

define release
	npm version $(1)
endef
