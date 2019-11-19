const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  //
  //console.log(`Hello ${nameToGreet}!`);
  // Get the JSON webhook payload for the event that triggered the workflow

  const ref = core.getInput('sha');

  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);

  const octokit = new github.GitHub(process.env.GITHUB_TOKEN);

  (async () => {
    let listForRef = await octokit.checks.listForRef({
      ...github.context.repo,
      ref,
    });
    console.log(JSON.stringify(listForRef));
  })();

  core.setOutput("status", "test");


} catch (error) {
  core.setFailed(error.message);
}
