// Removes the npmrc lines setup-npm-auth appended, so the token does not outlive
// the job on self-hosted runners that keep ~/.npmrc between jobs. A failure only
// warns: the job's own result is already decided by now.
const fs = require('node:fs');
const process = require('node:process');

const statePath = process.env.INPUT_STATE;

try {
  if (statePath && fs.existsSync(statePath)) {
    // Line 1 is the npmrc, line 2 whether setup-npm-auth created it, and the
    // rest are the lines it appended.
    const [npmrc, created, ...added] = fs
      .readFileSync(statePath, 'utf8')
      .split('\n')
      .filter((line) => line !== '');

    if (fs.existsSync(npmrc)) {
      const lines = fs.readFileSync(npmrc, 'utf8').split('\n');
      // The appended lines came after whatever the file already held, so taking
      // the last match leaves an identical line that was there before alone.
      for (const line of added.reverse()) {
        const index = lines.findLastIndex(
          (existing) => existing.replace(/\r$/u, '') === line,
        );
        if (index !== -1) lines.splice(index, 1);
      }

      const contents = lines.join('\n');
      if (created === 'true' && contents.trim() === '') {
        fs.rmSync(npmrc);
      } else {
        fs.writeFileSync(npmrc, contents);
      }
      process.stdout.write(
        `Removed the registry credentials setup-npm-auth added to ${npmrc}\n`,
      );
    }

    fs.rmSync(statePath, { force: true });
  }
} catch (error) {
  // Workflow commands are read from stdout.
  process.stdout.write(
    `::warning::setup-npm-auth could not remove the registry credentials it wrote: ${error.message}\n`,
  );
}
