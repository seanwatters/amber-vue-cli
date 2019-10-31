const inquirer = require('inquirer');
const write = require('write');
const exec = require('child_process').exec;

const api = (model, attributes) => {
  exec(`npm run vue-api ${model} ${attributes}`, () => {
    console.log('\nAPI Generated')
  });
};

const component = (name, state = null, props = null) => {
  write.sync(`frontend-vue/src/components/${name}.vue`, `<template>
  <div class=${name}>
    <h3>I am ${name}!</h3>
  </div>
</template>

<script>
export default {
  name: '${name}',
  ${state ? `data() {
    someState: null
  }` : ``}
  ${props ? `props: {
    someProp: String
  }` : ``}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .${name} {

  }
  h3 {
    margin: 40px 0 0;
    font-weight: lighter;
  }
</style>`, { overwrite: false });
  console.log('\nComponent Created')
};

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
        componenet(answers.component_name,
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
