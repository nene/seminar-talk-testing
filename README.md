# Unit Testing HTML & JavaScript

 1. ## JavaScript

 2. XRebel JavaScript codebase has grown to 11,500 lines (altogether in 150 files).
    A nice steady progress.  There's even a little drop at the end, which is the result
    of the recent sprints being heavily engineering-focused.

 3. ## Unit tests

    By now we also have lots of unit tests. More than actual code in fact: 12,800 lines.
    By this simple metric all of our code should be tested...

 4. Lets take this function "sum()" that simply sums up numbers in array.

 5. And describe some unit test for it.

 6. Just pass in array of 1, 2, 3 and expect an output of 6.  Hurray, it works!
    Looks like we're done in here.

 7. But as you might guess, this simple test likely doesn't cover all the branches
    in this code.  What we need is a code coverage report to see how large portion
    of the code the test actually excercises.

 8. ## Code coverage

    Running a code coverage tool shows us that the body of this first if-statement
    is never reached. Indeed, we don't have a test for an empty array - quite an
    important edge case.

 9. So lets write one. The sum of empty array should be zero.

10. Good, but oh, we have another uncovered branch.  The right hand side of
    the logical OR operator is never evaluated.  The code is important though,
    it checks that if the array contains something that's not a number, we treat
    it as zero.

11. Alright, let's add a test for that.  The sum of NULL should be zero.

12. Nice... now we have 100% code coverage.  What about XRebel code base.

13. Well... not quite as good.

    Actually only about 107 files out of 150 have unit tests associated with them.

    And even within these files the actual code coverage isn't 100%:

    - Statements coverage: 65.95%
    - Branches coverage: 50.49%
    - Functions coverage: 68.26%
    - Lines coverage: 65.98%

    The coverage has progressed up over time, but currently it's still somewhere around 65%.

    Of course, everybody knows that coverage isn't really a good metric of the quality
    of your tests.

    Code coverage only tells you which lines aren't executed by the tests.
    It doesn't tell you how well the covered lines actually are tested.

    This is where mutation testing comes to help.

14. ## Mutation testing

    So what is mutation testing?

    The premise behind mutation testing is that each line, function call, parameter value,
    ... every tiny detail in the code exists for a purpose. If one were to remove or slightly
    modify any part of the program the tests should fail.

    When tests don't fail our tests are likely lacking. Or if the tests are good, then the
    code itself might be is unneccessary.

    Lets try some mutation testing on our example code...

    What happens is that the mutation test runner makes a little modification to our code
    and re-runs all the tests. Then it tries another modification and runs the tests again.
    And so on and so forth.

    It doesn't just randomly flip bits though - that would just result in syntax errors.
    Instead it makes transformations on the AST, and it tries to make modifications that
    have a chance of actually revealing something.  Like it might try replacing less-than
    operator with less-or-equal.  Or replace logical-OR with logical-AND. Or just remove
    some code.

    It's important to note that we're talking about so-called Level 1 mutation testing where
    we just perform one mutation at a time.  Which is the most efficient form of mutation
    testing.  We might try several different mutations on one AST node, but we won't run into
    such a combinatorial explosion that we would get if we were to try doing two or more
    mutations at the same time.

15. So if we run it on our example code, the mutation test tells us that it can increase
    this argument of parseFloat() by one and the test still passes.

16. It could also decrese it by one.

17. Or even replace it with something different entirely, and the test still passes.
    Turns out, that parseFloat() doesn't actually take a second argument, and if you pass
    one, it just gets ignored.

18. So great, we can just remove this completely useless piece of code.
    Mutation testing is quite great at detecting cases where you're passing useless
    parameters or re-specifying the default parameters.

19. But hey... now it tells us that this whole parseFloat() call can be removed
    and our tests still pass.  Looks like we're missing another unit test.

20. The parseFloat() was needed because we want to pass in numbers as strings, and
    have them summed up as well - not concatenated.

21. Alright, now we're talking.

22. But what's that now? We can remove this whole if-statement and everything still
    works.  Looks like we've written some overly defensive code - we don't really need
    a special case for summing an empty array - and a mutation test is really good at
    picking up cases like that.

23. So great, it's gone for good.  Let's have one final run.

24. What? Apparently we can remove this whole function, but it will still works?!?
    And even stranger is that this is the case that actually happened when I ran
    mutation test over XRebel code base.  We were extending an utility library Lo-Dash
    with a quite useful array summing function, and the mutation test told me that I can
    just remove this whole thing. WTF!

    Turne out that we had recently upgraded the library and the new version had the
    sum() function already build in, so the mutation test very correctly pointed out,
    that it's a completely unneccessary piece of code.

25. So what about XRebel as a whole...

    Our mutation success rate is about 52%.  It doesn't quite relate to line numbers,
    but I've kind'a interpolated to give some perspective how the mutation testing
    compares to code coverage.

    Running the mutation test does take quite a bit of time: 1h 30min to test our whole
    code base. But it is quite a bit more feasable when you just run it against one module -
    then it will mostly be under a minute.

## Stats timeline:

<pre>
             coverage           mutation   code/test ratio
 1 Jan 2014:
 1 Feb 2014:
 1 Mar 2014:                               3524 / 0     |****
 1 Apr 2014:                               3524 / 0     |****
 1 May 2014:                               4658 / 0     |*****
 1 Jun 2014:                               5008 / 0     |*****
 1 Jul 2014:                               5214 / 0     |*****
 1 Aug 2014:                               4879 / 0     |*****
 1 Sep 2014:                               5489 /   471 |#*****
 1 Oct 2014:                               6790 /  3247 |###*******
 1 Nov 2014: 39.19% ( 1253/3197 )  26.5%   7722 /  5406 |#####********
 1 Dec 2014: 44.61% ( 1523/3414 )          8484 /  6507 |#######********
 1 Jan 2015: 47.28% ( 1695/3585 )          8971 /  7678 |########*********
 1 Feb 2015: 50.44% ( 1936/3838 )          9934 /  8715 |#########**********
 1 Mar 2015: 55.72% ( 2210/3966 )  42.3%  10438 /  9972 |##########**********
 1 Apr 2015: 59.66% ( 2517/4219 )  45.8%  11574 / 11881 |############************
 1 May 2015: 65.98% ( 2706/4101 )  52.3%  11352 / 12800 |#############************
</pre>
