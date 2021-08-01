<template >
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
            theme === 'light' ? 'bg-gray-100' : 'bg-dark700'
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
        <div class="flex flex-col items-end justify-end h-40 px-6 py-3">
          <div
            :class="`${
              theme === 'light' ? 'text-gray-500' : 'text-white'
            } text-3xl text-right inline-flex items-center`"
          >
            {{ state.calculation }}
          </div>
          <div
            :class="`${
              theme === 'light' ? 'text-gray-500' : 'text-white'
            } text-6xl text-right max-h-14 overflow-hidden`"
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
        place-items-center place-content-center
        ${theme === 'light' ? 'bg-gray-100' : 'bg-dark700'}
        `"
        >
          <button
            :class="`rounded-full w-16 h-16 text-xl ${
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
export default {
  name: 'Calculator',
  created() {
    document.title = 'MalasNgitung';
  },
  data() {
    return {
      theme: 'dark',
      buttons: [
        {text: 'ac', render: `<span class="text-green-500">AC</span>`},
        {
          text: 'percent',
          render: `<i class="fas fa-divide text-green-500"></i>`,
        },
        {
          text: 'percent',
          render: `<i class="fa fa-percent text-green-500" aria-hidden="true"></i>`,
        },
        {
          text: '/',
          render: `<i class="fas fa-divide text-red-500"></i>`,
        },
        ...this.objectFromNumbers({
          startAt: 7,
        }),
        {
          text: 'x',
          render: `<i class="fas fa-times text-red-500"></i>`,
        },
        ...this.objectFromNumbers({
          startAt: 4,
        }),
        {
          text: '-',
          render: `<i class="fas fa-minus text-red-500"></i>`,
        },
        ...this.objectFromNumbers({
          startAt: 1,
        }),
        {
          text: '+',
          render: `<i class="fas fa-plus text-red-500"></i>`,
        },
        {
          text: 'reset',
          render: `<i class="fas fa-redo transform -scale-x-100" aria-hidden="true"></i>`,
        },
        {text: '0', render: `<span>0</span>`},
        {text: '.', render: `<span>&#x2022</span>`},
        {text: '=', render: `<i class="fas fa-equals text-red-500"></i>`},
      ],
      state: {
        display: 0,
        calculation: 0,
        firstNumber: 0,
        secondNumber: 0,
        isWaiting: false,
        operator: null,
      },
    };
  },
  updated() {
    console.log(this.state);
  },
  methods: {
    handleButton(e) {
      const text = e.target.dataset.text.toString();
      const lastIsDot = () => this.state.display.toString().slice(-1) === '.';
      const displayIsZero = () => this.state.display == '0';

      switch (true) {
        case '+-x/'.includes(text):
          if (lastIsDot()) return;
          if (displayIsZero()) return;
          this.state.operator = text;
          this.state.firstNumber = this.state.display;
          this.state.isWaiting = true;
          this.state.calculation = this.state.display + ` ${text} `;
          this.state.display = 0;
          break;
        case text === '=':
          if (lastIsDot()) return;
          if (!this.state.isWaiting || displayIsZero()) return;
          this.calculate();
          break;
        case text === 'reset':
          this.reset();
          break;
        case text === '.':
          if (this.state.display.toString().includes('.')) {
            return;
          } else {
            if (this.state.isWaiting) {
              this.state.secondNumber += text;
            }
            this.state.display += text;
          }
          break;
        default:
          if (displayIsZero()) {
            if (this.state.isWaiting) {
              this.state.secondNumber = text;
            }
            this.state.display = text;
            return;
          }
          if (this.state.isWaiting) {
            this.state.secondNumber += text;
          }
          this.state.display += text;
          break;
      }
    },
    calculate() {
      const firstNumber = parseFloat(this.state.firstNumber);
      const secondNumber = parseFloat(this.state.secondNumber);
      let result;
      switch (this.state.operator) {
        case '+':
          result = firstNumber + secondNumber;
          break;
        case '-':
          result = firstNumber - secondNumber;
          break;
        case 'x':
          result = firstNumber * secondNumber;
          break;
        case '/':
          result = firstNumber / secondNumber;
          break;
      }
      result = parseFloat(result.toFixed(3));
      this.state.display = result;
      this.state.firstNumber = result;
      this.state.calculation += ` ${this.state.secondNumber} `;
      this.state.secondNumber = 0;
      this.state.operator = null;
      this.state.isWaiting = false;
    },
    reset() {
      this.state = {
        display: 0,
        calculation: 0,
        firstNumber: 0,
        secondNumber: 0,
        isWaiting: false,
        operator: null,
      };
    },
    objectFromNumbers({count = 3, startAt = 1}) {
      return [...Array(count).keys()].map((item) => {
        return {
          text: item + startAt,
          render: `<span>${item + startAt}</span>`,
        };
      });
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Fira Sans", sans-serif;
}
</style>
