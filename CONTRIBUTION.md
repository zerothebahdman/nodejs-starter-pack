# Making contributions

You've just gotten on this project and you're as excited as bells, yes?
You'll want to chill a bit and do a bit of understanding guidelines on how you'll make commit messages. I've found commit messages to be very helpful as regards large projects or projects with more than one contributor.

## Why this?

The point is to have some sort of consistent commit message to ensure ease of flow across repositories and projects. Also, it helps in your personal project, you having a standard to follow.

### How to begin

The point of the commit message has to do with a prefix. Commit messages should be in the format:
```[Commit type]: Message(Try to stay within 50 chars)```

Where:

- Commit type: refers to one of a predefined subset of what a commit could mean. The subsets are:
  - Feature: Involves adding a new feature to the product or an implementation of a specified feature.
  - Chore: For changes that do not add new functionality but simply denotes a task performed. Does not have to do with bug fixes. Changes includes: initializing a new project, addition of files, partial changes that do not cause bugs, updates, etc.
  - Bug: For changes fixing a bug, typo or anything that leads to correctness of the system being worked on
  - Buggy: Should be avoided as much as possible but could be needed. It is used when changes have been partially implemented and execution of the current state of the project would lead to evil bugs and sinister errors. An example refers to unclosed tags and a hurried commit since you might not get access to your PC for a while. Projects with this commit type as the latest one should perhaps not be pulled or cloned except such implementation is to be continued by you.

- Message: refers to a message describing the changes made. It is important that each commit should only reflect one feature or implementation change. You should not cram two functionalities into one commit except they depend closely on one another. For example, implmentation of auth and adding views for a user profile are closely related but do not inter-depend on one another and should be separated into different commits. This is just to ensure a dev could work with states that are narrowed down to specific implementations and features.

## FAQ

- Must I do this: Yes
- Why: Read up
- Is this the best implementation there is: Nah, I don't think so. It is subject to review and subsequent update. For now, do this.
- How did you come up with this: Can't remember
- Has it worked so far: I think so
- What else: Nothing

### Got issues?

Raise an issue.

### Don't have issues?

Do giveaway.

### Friend's got issues?

Raise an issue.

### Friend's not got issues?

Cool.
