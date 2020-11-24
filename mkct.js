const fs = require('fs');

const FILE_OPTION = 'file';
const DEFAULT_EXT = 'md';

const makeContents = (filepath) => {
  const sourcePath = `./${filepath}.${DEFAULT_EXT}`;

  if (!fs.existsSync(sourcePath)) {
    console.error('Source file does not exist.');
    return;
  }

  fs.readFile(sourcePath, 'utf8', (err, data) => {
    const titles = data.match(/#+\s.+/g);

    if (titles.length) {
      const modifiedTitles = titles.map(
        (item) => `- [${item.replace(/#+\s/, '')}](${item.replace(/\s/g, '-')})`
      );
      const targetPath = `./${filepath}-contents.${DEFAULT_EXT}`;

      fs.writeFile(targetPath, modifiedTitles.join('\n\n'), (err) => {});
    }
  });
};

const fileArgv = process.argv.find(
  (item) => item.indexOf(`--${FILE_OPTION}=`) !== -1
);

if (!fileArgv) {
  console.error(`Command line option --${FILE_OPTION} should be written.`);
} else {
  const filepath = fileArgv.split('=')[1];

  makeContents(filepath);
}
