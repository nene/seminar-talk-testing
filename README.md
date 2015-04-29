# Unit Testing HTML & JavaScript

## JavaScript LOC

XRebel JavaScript codebase has grown to 11,500 lines in 150 files.

## Tests LOC

By now we have also lots of unit tests. More than actual code in fact: 12,800 lines.

By this simple metric all of our code should be tested...

## Code coverage

Actually only about 107 files out of 150 have unit tests associated with them.

And even within these files the actual code coverage isn't 100%:

- Statements coverage: 65.95%
- Branches coverage: 50.49%
- Functions coverage: 68.26%
- Lines coverage: 65.98%

Timeline of line coverage:

<pre>
             coverage                code/test ratio
 1 Jan 2014:
 1 Feb 2014:
 1 Mar 2014:                         3524 / 0     |****
 1 Apr 2014:                         3524 / 0     |****
 1 May 2014:                         4658 / 0     |*****
 1 Jun 2014:                         5008 / 0     |*****
 1 Jul 2014:                         5214 / 0     |*****
 1 Aug 2014:                         4879 / 0     |*****
 1 Sep 2014:                         5489 /   471 |#*****
 1 Oct 2014:                         6790 /  3247 |###*******
 1 Nov 2014: 39.19% ( 1253/3197 )    7722 /  5406 |#####********
 1 Dec 2014: 44.61% ( 1523/3414 )    8484 /  6507 |#######********
 1 Jan 2015: 47.28% ( 1695/3585 )    8971 /  7678 |########*********
 1 Feb 2015: 50.44% ( 1936/3838 )    9934 /  8715 |#########**********
 1 Mar 2015: 55.72% ( 2210/3966 )   10438 /  9972 |##########**********
 1 Apr 2015: 59.66% ( 2517/4219 )   11574 / 11881 |############************
26 Apr 2015: 65.98% ( 2706/4101 )   11593 / 12874 |#############************
</pre>

## Mutation testing

Code coverage only tells you which lines aren't executed by the tests.
It doesn't tell you how well the covered lines actually are tested.

This is where mutation testing comes to help.

The premise behind mutation testing is that each line, function call, parameter value,
... every tiny detail in the code exists for a purpose. If one were to remove or slightly
modify any part of the program the tests should fail.

When tests don't fail our tests are likely lacking. Or if the tests are good, then the
code itself might be is unneccessary, like:

- default parameter values that could be left out.
- overly defensive coding.

Our mutation success rate is 55.9%
