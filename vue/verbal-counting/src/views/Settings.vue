<template>
  <div class="main">
    <h1 class="title">Привет!</h1>
    <p>Ваш последний результат - решено {{trueAnswersCount}} из {{turnCount}}.</p>
    <p>Общая точность {{setAccuracy}} %.</p>
    <Options class="options" @submit="handleSubmit"/>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import {OPERATIONS} from "../assets";
  import Options from "../components/Options";

  export default {
    id: 'Settings',

    components: {
      Options
    },

    data() {
      return {
        turnCount: this.$store.state.turnCount,
        trueAnswersCount: this.$store.state.trueAnswersCount,
      }
    },

    computed: {
      setAccuracy() {
        if (!this.turnCount || !this.trueAnswersCount) {
          return 0
        }
        return Math.floor(this.trueAnswersCount / this.turnCount * 100)
      }
    },

    methods: {
      ...mapMutations([
        'setTime',
        'setLevel',
        'setOperations',
      ]),

      handleSubmit(form) {
        const data = new FormData(form);

        const
                time = data.get('time'),
                level = data.get('level'),
                operations = OPERATIONS
                        .map(({id}) => {
                          if (data.get(id) !== null) {
                            return id
                          }
                        })
                        .filter(item => item);

        this.setTime({amount: time});
        this.setLevel({amount: level});
        this.setOperations({amount: operations});

        if (operations.length > 0) {
          this.$router.push('/game')
        }
      }
    }
  }
</script>

<style scoped>
  .main {
    display: inline-block;
    margin: 1.5em 1em 2em 2em;
  }

  .title {
    color: #2846c2;
  }

  .options {
    margin-top: 2em;
  }
</style>
