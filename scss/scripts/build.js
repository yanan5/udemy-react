const fs = require('fs');
const _path = require('path');
const sass = require('node-sass');

const getComponents = () => {
  let allComponents = [];
  const types = ['atoms', 'molecules', 'organisms'];

  types.forEach(type => {
    const allFiles = fs
      .readdirSync(`src/${type}`)
      .map(file => path.resolve(file));
  });

  allComponents = [...allComponents, ...allFiles];
};
const compile = (path, fileName) => {
  const result = sass
    .renderSync({
      data: fs.readFileSync(_path.resolve(path)).toString(),
      outputStyle: 'expanded',
      outFile: 'global.css',
      includePaths: [_path.resolve('src')],
    })
    .css.toString();

  fs.writeFileSync(_path.resolve(fileName), result.css.toString());
};

compile('src/global.scss', 'src/lib/global.css');
