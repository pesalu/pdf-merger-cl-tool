const PDFMerger = require("pdf-merger-js");
var merger = new PDFMerger();

const commander = require("commander");

let mergeAndExport = async (files, outputFilename) => {
  for (let i = 0; i < files.length; i++) {
    await merger.add(files[i]);
  }

  await merger.save(outputFilename);
};

commander
  .version("1.0.0", "-v, --version")
  .usage("[OPTIONS]...")
  .option("-f, --files <values...>", "Paths pdf files")
  .option("-n, --output <value>", "Name of the output file")
  .parse(process.argv);

const options = commander.opts();

if (!options.files) {
  console.log("No file paths given, exit.");
  process.exit();
} else if (!options.output) {
  console.log("No name for output file given. Exit.");
  process.exit();
}

const files = options.files;
const outFile = options.output;

console.log(`Files to merge: ${files}`);

mergeAndExport(files, outFile);
console.log(`\n`);
console.log(`New file ${outFile} created!`);
