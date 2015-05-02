#!/usr/bin/env bash

for file in $(cat all-files.txt); do
    test_file=$(echo $file | sed 's/.js$/Test.js/' | sed 's/^resources\/xr/resources\/tests\/specs/')

    # When no specific unit test exists for our file,
    # use an empty test that always succeeds.
    if [ ! -e "$test_file" ]; then
        test_file="resources/tests/specs/emptyTest.js"
    fi

    echo "Testing" $file "using" $test_file

    # Only turn on the specific test for this class
    sed -i "" 's/^    describe/    ddescribe/' $test_file

    # Run mutations test
    sed -i "" "s|{PLACEHOLDER}|$file|" Gruntfile.js
    grunt
    sed -i "" "s|$file|{PLACEHOLDER}|" Gruntfile.js

    # Back out the ddescribe().
    sed -i "" 's/^    ddescribe/    describe/' $test_file
done
