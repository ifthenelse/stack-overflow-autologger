#!/bin/zsh

# use scripts-common https://gitlab.com/bertrand-benoit/scripts-common
currentDir=$( dirname "$( command -v "$0" )" )
scriptsCommonUtilities="$currentDir/scripts-common/utilities.sh"
[ ! -f "$scriptsCommonUtilities" ] && echo -e "ERROR: scripts-common utilities not found, you must initialize your git submodule once after you cloned the repository:\ngit submodule init\ngit submodule update" >&2 && exit 1
# shellcheck disable=1090
. "$scriptsCommonUtilities"

if isRootUser; then
  errorMessage "This script should not be launched with root user."
fi


if hash nvm 2>/dev/null; then
    echo "nvm not found!"
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
    cd $PWD
fi

nvm use
npm run start