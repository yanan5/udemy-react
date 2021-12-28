const fs = require('fs');
const _path = require('path');
const sass = require('node-sass');

const getComponents = () => {
  let allComponents = [];
  const types = ['atoms', 'molecules', 'organisms'];

  types.forEach(type => {
    const allFiles = fs.readdirSync(`src/${type}`).map(file => ({
      input: `src/${type}/${file}`,
      output: `src/lib/${file.slice(0, -4) + 'css'}`,
    }));
    allComponents = [...allComponents, ...allFiles];
  });

  return allComponents;
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

  fs.writeFileSync(_path.resolve(fileName), result);
};

compile('src/global.scss', 'src/lib/global.css');
getComponents().forEach(component => {
  console.log('component', component);
  console.log(_path.resolve(component.input));
  console.log(_path.resolve(component.output));
  compile(component.input, component.output);
});
