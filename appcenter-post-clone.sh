#!/usr/bin/env bash
set -e
set -x
echo "$APPCENTER_BRANCH"
if [ "$APPCENTER_BRANCH" == 'master' ]; then
#here you can do stuff for master, like injecting keys, etc.
else
echo 'copying iOS Dev Firebase file into Prod folder, so analytics uses the Dev file'
cp -rf "ios/Firebase/Dev/GoogleService-Info.plist" "ios/firebase/Prod"
# we do the same for Android
echo 'copying Android debug Firebase file into release folder, so analytics uses the Dev file'
cp -rf "android/app/src/debug/google-services.json" "android/app/src/release/google-services.json"
fi