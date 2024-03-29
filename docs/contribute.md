# Creating issues and PRs

### Issue and PR etiquette

#### Issues

Issues are a way to show what feature is currently being worked on and allows others to see what is needed for the feature to be declared as complete. To do this, a good title and description for the issue is needed.

The title should describe the feature being worked on, while the body of the issue should describe what's possible as a result of completing the feature and what criteria the feature must comply with (*acceptance criteria*).

For the *acceptance criteria*, state exactly what the feature must do for it to be declared as complete. For example, If I were working on filtering items based on the tags they have, my criteria could be the following: When the user picks one or more tags to filter by, then only the items which contain the selected tags should appear.

Note: for working on features it is a good idea to work on it in a separate branch. If a change is made in the new branch and everything suddenly stops working, that effect is isolated from the main branch. To make a new branch run `git checkout -b [name of branch]`.

---

#### PRs

A PR shows what feature was added and describes important changes to the code. 

A PR can be [created](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request?tool=cli) in many ways. Pick the way which is most convenient for you. After you create the PR you will receive the option to edit the title and body of the PR.

The title of the PR should be the feature you are working on, while the body should describe the result of completing the feature and the changes made in the code.

For describing the changes made in the code, it is not necessary to put every little change since that can be seen by comparing the files. It is important to mention the big changes that have occurred, such as added dependencies, tests, and complicated functions.

When describing the changes made, list the file that you modified and describe the changes to the file below.

After you finish editing the title and body, submit the PR.

### Reviewing and merging the PR

* The author of the PR is responsible to merge it
* One approval minimum is required
* Use comments to ask for changes
* Use NIT to indicate the comment is a suggestion but not a must
* Use Squash option when merging
* Delete the branch afterwards

---



## Checking the Github action locally

Instead of doing a PR and checking the result of the workflow then, you can run the workflow locally to confirm it works before making the PR.

To do this you need to do the following:
* Install [act](https://github.com/nektos/act). 
* Run `act pull_request`

After this you will either see a message that the tests passed or that they failed.

---