<template>
  <div class="bg-gray-500">
    <div
      :class="`
      w-screen
      h-screen
      mx-auto
      relative
      ${theme === 'light' ? 'bg-white' : 'bg-dark900'}
      shadow-lg
      sm:max-w-sm
      md:max-w-sm
      lg:max-w-sm
      xl:max-w-sm
      table`"
    >
      <div class="text-center py-2 w-full fixed top-0 left-0">
        <div
          :class="`mx-auto inline-flex space-x-6 rounded-xl py-2 px-4  ${
            theme === 'light' ? 'bg-gray-200' : 'bg-dark700'
          }
        `"
        >
          <button
            :class="`text-xl ${
              theme === 'light'
                ? 'text-gray-500 text-opacity-100'
                : 'text-white text-opacity-50'
            }`"
            v-on:click="theme = 'light'"
          >
            <i class="far fa-sun" aria-hidden="true"></i>
          </button>
          <button
            :class="`text-xl ${
              theme === 'light'
                ? 'text-gray-500 text-opacity-50'
                : 'text-white text-opacity-100'
            }`"
            v-on:click="theme = 'dark'"
          >
            <i class="far fa-moon" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div class="h-3/4 w-full table-cell align-bottom">
        <div class="flex flex-col items-end justify-end h-40 px-6 py-33">
          <div
            :class="`${
              theme === 'light' ? 'text-gray-500' : 'text-white text-opacity-50'
            } ${
              state.calculation.length > 30 ? 'text-xl' : 'text-3xl'
            } text-right inline-flex items-center mb-3`"
          >
            {{ state.calculation }}
          </div>
          <div
            :class="`${
              theme === 'light' ? 'text-gray-500' : 'text-white'
            } text-6xl text-right duration-300`"
          >
            {{ state.display }}
          </div>
        </div>
        <div
          :class="`
        grid grid-cols-4
        p-6
        rounded-t-3xl
        gap-3
        mx-3
        place-items-center place-content-center
        ${theme === 'light' ? 'bg-gray-200' : 'bg-dark700'}
        `"
        >
          <button
            :class="`rounded-full w-16 h-16 text-2xl font-bold ${
              theme === 'light'
                ? 'text-gray-500 bg-white'
                : 'bg-dark900 text-white'
            }`"
            v-for="item in buttons"
            v-on:click="handleButton"
            :key="item"
            :data-text="item.text"
          >
            <div v-html="item.render" class="pointer-events-none"></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const objectFromNumbers = ({ count = 3, startAt = 1 }) => [...Array(count).keys()].map((item) => ({
  text: item + startAt,
  render: `<span>${item + startAt}</span>`,
}));

const BUTTONS = [
  { text: 'ac', render: '<span class="text-green-500">CE</span>' },
  {
    text: 'plusmin',
    render: '<span class="text-green-500">+/-</span>',
  },
  {
    text: 'percent',
    render: '<i class="fa fa-percent text-green-500" aria-hidden="true"></i>',
  },
  {
    text: '÷',
    render: '<i class="fas fa-divide text-red-500"></i>',
  },
  ...objectFromNumbers({
    startAt: 7,
  }),
  {
    text: 'x',
    render: '<i class="fas fa-times text-red-500"></i>',
  },
  ...objectFromNumbers({
    startAt: 4,
  }),
  {
    text: '-',
    render: '<i class="fas fa-minus text-red-500"></i>',
  },
  ...objectFromNumbers({
    startAt: 1,
  }),
  {
    text: '+',
    render: '<i class="fas fa-plus text-red-500"></i>',
  },
  {
    text: 'reset',
    render:
      '<i class="fas fa-redo transform -scale-x-100" aria-hidden="true"></i>',
  },
  { text: '0', render: '<span>0</span>' },
  { text: '.', render: '<span>&#x2022</span>' },
  { text: '=', render: '<i class="fas fa-equals text-red-500"></i>' },
];

export default {
  name: 'Calculator',
  created() {
    document.title = 'MalasNgitung';
  },
  data() {
    return {
      theme: 'light',
      buttons: BUTTONS,
      operators: new RegExp(/[+|\-|x|\u÷]/g),
      state: {
        display: 0,
        calculation: 0,
        records: 0,
        waiting: false,
      },
    };
  },
  updated() {
    // console.log(this.$data.state);
  },
  methods: {
    handleButton(e) {
      const text = e.target.dataset.text.toString();
      const { display } = this.state;
      const { operators } = this;
      const displayIsZero = () => display == 0;
      const lastInput = display.toString().charAt(display.length - 1);

      switch (true) {
        case text === 'ac':
          this.handleDelete();
          break;
        case text === 'percent':
          this.handlePercent();
          break;
        case text === 'plusmin':
          this.handlePlusMin();
          break;
        case text === 'reset':
          this.handleReset();
          break;
        case text === '.':
          this.handleDot();
          break;
        case text.match(operators) !== null:
          this.handleOperator(text);
          break;
        case text === '=':
          this.handleCalculate();
          break;
        default:
          if (lastInput === ')') return;
          if (displayIsZero()) {
            this.state.records = text;
            this.state.display = text;
            return;
          }
          this.state.records += text;
          this.state.display += text;
          break;
      }
    },
    handleCalculate(mode = 'default') {
      let display = this.state.display.toString();
      display = display.replaceAll('x', '*');
      display = display.replaceAll('÷', '/');

      const count = () => new Function(`return ${display}`)();

      let result;
      switch (mode) {
        case 'percent':
          result = parseFloat((count() / 100).toFixed(3));
          break;
        default:
          result = parseFloat(count().toFixed(3));
          this.state.calculation = this.state.display;
          break;
      }
      this.state.display = result;
      this.state.records = 0;
    },
    handleDelete() {
      const display = this.state.display.toString();
      const firstTwoInput = display.substring(0, 2);
      const lastInput = display.charAt(display.length - 1);
      const removedScopedMinus = display.substring(2, display.length - 1);
      if (firstTwoInput === '-(' && lastInput === ')') {
        this.state.display = removedScopedMinus;
        return;
      }
      if (display.length === 1) {
        this.state.display = 0;
        return;
      }
      this.state.display = display.trim().slice(0, -1);
    },
    handleDot() {
      const { display } = this.state;
      const { operators } = this;
      const lastInput = display.toString().slice(-1);
      const displayIsZero = () => display === 0;
      if (displayIsZero()) {
        this.state.display += '.';
        return;
      }

      const lastNumbers = display.toString().split(operators).slice(-1)[0];
      if (lastNumbers.includes('.')) return;
      if (lastInput.includes(')')) return;
      if (lastInput.match(operators)) return;
      this.state.display += '.';
    },
    handleOperator(text) {
      const { display } = this.state;
      const { operators } = this;
      const lastInput = display.toString().slice(-1);
      const lastIsDot = () => lastInput === '.';
      const displayIsZero = () => display == 0;

      if (displayIsZero() || lastIsDot()) return;
      if (lastInput.match(operators)) {
        this.state.display = display.substring(0, display.length - 1) + text;
        return;
      }
      this.state.display += text;
    },
    handlePercent() {
      const display = this.state.display.toString();
      const lastInput = display.charAt(display.length - 1);
      const { operators } = this;
      if (lastInput.match(operators)) {
        this.state.display = display.substring(0, display.length - 1);
      }

      this.handleCalculate('percent');
    },
    handlePlusMin() {
      const display = this.state.display.toString();
      const { operators } = this;
      const isOperatorIncluded = display
        .substring(1, display.length)
        .match(operators);
      const firstTwoInput = display.substring(0, 2);
      const lastInput = display.charAt(display.length - 1);
      const removedScopedMinus = display.substring(2, display.length - 1);
      if (lastInput.match(operators)) return;
      if (firstTwoInput === '-(' && lastInput === ')') {
        this.state.display = removedScopedMinus;
      } else if (firstTwoInput.match(/[0-9]/g) && !isOperatorIncluded) {
        this.state.display = -display;
      } else {
        this.state.display = `-(${display})`;
      }
    },
    handleReset() {
      this.state = {
        display: 0,
        calculation: 0,
        records: 0,
        waiting: false,
      };
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Fira Sans", sans-serif;
}
</style>
