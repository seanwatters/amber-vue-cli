const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const write = require('write');
const exec = require('child_process').exec;

const api = (model, attributes) => {
  exec(`amber generate api ${model} ${attributes}`, () => {
    console.log('\nAPI Generated')
  });
};

const component = (name, state = null, props = null) => {
  let testPath = path.join(__dirname, '../../frontend-vue/dev/templates/component.vue');
  fs.readFile(testPath, {encoding: 'utf-8'}, (err, data) => {
    if (!err && !data.replace(/\s/g, '').length == 0) {
      write.sync(`frontend-vue/src/components/${name}.vue`, data, { overwrite: false })
      console.log('componenet created with template')
    } else {
      write.sync(`frontend-vue/src/components/${name}.vue`, '', { overwrite: false })
      console.log('created without componenet template')
    }
  })
}

module.exports.vue_tools = () => {
  inquirer.prompt([
    {
      type: 'list',
      message: 'Select generator',
      name: 'generator',
      choices: [
        {
          name: 'scaffold'
        },
        {
          name: 'component'
        },
        {
          name: 'api'
        }
      ]
    }
  ])
  .then(answers => {
    switch(answers.generator) {
      case 'scaffold':
        inquirer.prompt([
          {
            type: 'input',
            name: 'component_name',
            message: "Component Name: "
          },
          {
            type: 'input',
            name: 'component_state',
            message: "Component State: "
          },
          {
            type: 'input',
            name: 'component_props',
            message: "Component Props: "
          }
        ])
        .then(answers => {
          component(answers.component_name,
                     answers.component_state,
                     answers.component_props)

          inquirer.prompt([
            {
              type: 'input',
              name: 'model',
              message: "model: "
            },
            {
              type: 'input',
              name: 'attributes',
              message: "attributes: "
            }
          ])
          .then(answers => {
            api(answers.model, answers.attributes)
          })
        })
        break;
      case 'component':
        inquirer.prompt([
          {
            type: 'input',
            name: 'component_name',
            message: "Component Name: "
          },
          {
            type: 'input',
            name: 'component_state',
            message: "Component State: "
          },
          {
            type: 'input',
            name: 'component_props',
            message: "Component Props: "
          }
        ])
        .then(answers => {
          component(answers.component_name,
                     answers.component_state,
                     answers.component_props)
        })
        break;
      case 'api':
        inquirer.prompt([
          {
            type: 'input',
            name: 'model',
            message: "model: "
          },
          {
            type: 'input',
            name: 'attributes',
            message: "attributes: "
          }
        ])
        .then(answers => {
          api(answers.model, answers.attributes)
        })
        break;
      default:
        generator()
        break;
    }
  });
}
