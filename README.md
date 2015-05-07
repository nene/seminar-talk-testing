# Unit Testing HTML & JavaScript

 *  ## JavaScript

    Within ~1 year, XRebel code base has grown to 11,500 lines of JavaScript
    (altogether in 150 files). A nice steady progress.

    A little drop at the end: engineering-focused sprints.

 *  ## Unit tests

    After the launch of 1.0 we started to write unit tests.
    Now more unit tests than actual code: 12,800 lines.

 *  ## Code coverage

    Overall code coverage: 65%

    Some files aren't tested at all.
    Only ~107 files out of 150 have unit tests associated with them.

 *  ## Code coverage Example

    As an example we have this sum() function for summing up numbers in array.

    And we have a little test to ensure this works.

    Running a code coverage tool:

    - IF statement body never reached.
    - Right-hand side of OR operator never evaluated.

    Let's fix these by adding more tests:

    - The sum of empty array should be zero.
    - When array contains NULL-s, treat them as zero.

    SUCCESS: 100% code coverage!

    Of course, everybody knows that coverage only gets you so far...

    Code coverage only tells you which lines aren't executed by the tests.
    It doesn't tell you how well the covered lines actually are tested.

    This is where mutation testing comes to help.

  * ## Mutation testing

    So what is mutation testing?

    The premise behind mutation testing is that each line, function call, parameter value,
    ... every tiny detail in the code exists for a purpose. If one were to remove or slightly
    modify any part of the program the tests should fail.

    When tests don't fail our tests are likely lacking. Or if the tests are good, then the
    code itself might be is unneccessary.

    The mutation test runner makes a little modification to our code
    and re-runs all the tests. Then it tries another modification and runs the tests again...

    It doesn't just randomly flip bits though - that would just result in syntax errors.
    Instead it makes transformations on the AST, and it tries to make modifications that
    have a chance of actually revealing something.  Like it might try replacing less-than
    operator with less-or-equal.  Or replace logical-OR with logical-AND. Or just remove
    some code.

  * ## Mutation testing Example

    - increase parseFloat() argument by 1 - still passes.
    - decrease parseFloat() argument by 1 - still passes.
    - replace with something different altogether - still passes.

    Turns out, that parseFloat() doesn't actually take a second argument, and if you pass
    one, it just gets ignored.

    Great: just remove this completely useless piece of code.

    > Mutation testing is great at detecting cases where you're passing useless
      parameters or re-specifying the default ones.

    - The whole parseFloat() call can be removed - still passes.

    We have a missing test.

    Great: Add missing test: summing numeric strings in array.

    - Removing this whole if-statement - still passes.

    Looks like we've written some overly defensive code. Let's get rid of this.

    > Mutation test is really good at picking up cases like that.

    ...pa-ba-bahh...

    - We can remove this whole function - still passes!?!

    Happened in XRebel.  We were extending an utility library Lo-Dash
    with a quite useful array summing function, and the mutation test told me that I can
    just remove this whole thing. WTF!

    Turned out that we had recently upgraded the library and the new version had the
    sum() function already build in, so the mutation test very correctly pointed out,
    that it's a completely unneccessary piece of code.

  * ## Mutation testing chart

    Our mutation success rate is about 52%.  It doesn't quite relate to line numbers,
    but I've kind'a interpolated to give some perspective how the mutation testing
    compares to code coverage.

    Running the mutation test does take quite a bit of time: 1h 30min to test our whole
    code base - a great opportunity for slacking off!

    But it is quite a bit more feasable when you just run it against one module -
    then it will mostly be under a minute.

    * * *

    It's important to note that we're talking about so-called Level 1 mutation testing where
    we just perform one mutation at a time.  Which is the most efficient form of mutation
    testing.  We might try several different mutations on one AST node, but we won't run into
    such a combinatorial explosion that we would get if we were to try doing two or more
    mutations at the same time.

## Stats timeline:

<pre>
             coverage           mutation   code/test ratio
 1 Jan 2014:
 1 Feb 2014:
 1 Mar 2014:                               2453 / 0     |****
 1 Apr 2014:                               2978 / 0     |****
 1 May 2014:                               4112 / 0     |*****
 1 Jun 2014:                               4462 / 0     |*****
 1 Jul 2014:                               4668 / 0     |*****
 1 Aug 2014:                               4879 / 0     |*****
 1 Sep 2014:                               5489 /   471 |#*****
 1 Oct 2014:                               6790 /  3247 |###*******
 1 Nov 2014: 39.19% ( 1253/3197 )  26.5%   7722 /  5406 |#####********
 1 Dec 2014: 44.61% ( 1523/3414 )  29.5%   8484 /  6507 |#######********
 1 Jan 2015: 47.28% ( 1695/3585 )  32.9%   8971 /  7678 |########*********
 1 Feb 2015: 50.44% ( 1936/3838 )  36.7%   9934 /  8715 |#########**********
 1 Mar 2015: 55.72% ( 2210/3966 )  42.3%  10438 /  9972 |##########**********
 1 Apr 2015: 59.66% ( 2517/4219 )  45.8%  11574 / 11881 |############************
 1 May 2015: 65.98% ( 2706/4101 )  52.3%  11352 / 12800 |#############************
</pre>
