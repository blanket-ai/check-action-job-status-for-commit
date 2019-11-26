const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
  try {
    const ref = core.getInput('ref');
    const jobName = core.getInput('job_name');
    const octokit = new github.GitHub(process.env.GITHUB_TOKEN);

    // Find all the checks that have run (or are currently running) on a given ref.
    let listForRef = await octokit.checks.listForRef({
      ...github.context.repo,
      ref,
    });

    // This assumes that the check we're looking for is a push check, since we'll only get one push event per ref.
    // This won't work so well for actions which execute on other events.
    let result = listForRef.data.check_runs.find(e => e.name === jobName);

    if(!result) {
      throw new Error(`No check run matching the name "${jobName}" was found.`)
    }

    core.setOutput("status", result.status);
  } catch (error) {
    core.setFailed(error.message);
  }
})();
