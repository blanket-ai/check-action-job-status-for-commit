# check-action-job-status-for-commit
This returns the job status of a given Github workflow check.  

## Motivation
Github Actions currently doesn't have a "built-in" way (other than using the Github API itself) to say whether a given
PR has been merged or not. If a more "built-in" way ever appears, we can discard this project.   

## Installation
This is meant to be used as a step in a Github workflow, hence there's not much else to do than to add this step to your
workflow.

```yaml
      - uses: blanket-ai/check-action-job-status-for-commit@master
        id: get_job_status
        name: Check if build+test has succeeded
        with:
          ref: some-sha-or-branch-name
          job_name: build
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Requirements
The only requirements for making this work, apart from using Github Actions is specify `GITHUB_TOKEN` as an environment
variable to the action. Github already supplies a default `GITHUB_TOKEN`, so copying the `env` stanza above as-is should
be enough. 

You also need to specify the PR which you are interested in finding out whether it has been merged or not. That is the 
`pr_number` input variable above. 

## Usage
A more complete example, using the machine-learning-apps/actions-chatops action:

```yaml
name: example-deploy-flow
on:
  issue_comment:
    types: [created, edited]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - id: trigger
        name: Listen for PR Comments
        uses: machine-learning-apps/actions-chatops@master
        with:
          TRIGGER_PHRASE: "/deploy"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - uses: blanket-ai/check-action-job-status-for-commit@master
        id: get_job_status
        name: Check if build+test has succeeded
        with:
          ref: ${{ steps.trigger.outputs.SHA }}
          job_name: build
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Testing
TODO

## Deployment / Publication
This is hosted as a Github action. As long as `node_modules` is checked in and everything has been merged and pushed on
Github we're good.
