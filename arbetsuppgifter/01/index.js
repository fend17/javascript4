const Display = ({ value }) => (
  <p>{ value }</p>
);

class Number extends React.Component {
  onClick = (e) => {
    this.props.onClick(this.props.number);
  }

  render() {
    return (
      <button onClick={this.onClick}>{ this.props.number }</button>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.numberKeys = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

    this.state = ({ 
      currentValue: 0,
      previousValue: 0,
      startNewNumber: false,
      isCalculating: false
    });
  }

  putNumber = (number) => {
    const { currentValue, startNewNumber } = this.state;
    if (currentValue === 0 || startNewNumber) { 
      this.setState({
        currentValue: number,
        startNewNumber: false
      });
    } else {
      this.setState({
        currentValue: parseFloat(currentValue.toString() + number, 10)
      });
    }
  }

  addNumbers = (e) => {
    const { currentValue, isCalculating } = this.state;
    const useCurrentValue = isCalculating ? this.getNewValue() : currentValue;  

    this.setState({
      currentValue: useCurrentValue,
      previousValue: useCurrentValue,
      startNewNumber: true,
      isCalculating: e.target.dataset.method
    });
  }

  getNewValue = () => {
    const { currentValue, previousValue, isCalculating } = this.state;

    switch(isCalculating) {
      case 'add': 
        return previousValue + currentValue;
      case 'sub': 
        return previousValue - currentValue;
      case 'multi':
        return previousValue * currentValue;
      case 'div':
        return previousValue / currentValue;
      default:
        return 0;
    }
  }

  finishCalculation = (e) => {
    if (this.state.isCalculating) {
      this.setState({
        currentValue: this.getNewValue(),
        previousValue: 0,
        isCalculating: false
      });
    }
  }

  clearCalculation = (e) => {
    this.setState({
      currentValue: 0,
      previousValue: 0,
      isCalculating: false
    });
  }

  render() {
    const { currentValue } = this.state;

    return (
      <div>
        <Display value={currentValue} />
        { this.numberKeys.map((numberKey, i) => (
            <React.Fragment key={`numberKey-${numberKey}`}>
              <Number number={numberKey} onClick={this.putNumber} />
              { i % 3 === 2 && 
                <br />
              }
            </React.Fragment>
        )) }
        <br />
        <button onClick={this.addNumbers} data-method='add'>+</button>
        <button onClick={this.addNumbers} data-method='sub'>-</button>
        <button onClick={this.addNumbers} data-method='multi'>*</button>
        <button onClick={this.addNumbers} data-method='div'>/</button>
        <br />
        <button onClick={this.finishCalculation}>=</button>
        <br />
        <button onClick={this.clearCalculation}>CLEAR</button>
      </div>
    );
  }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<Calculator />, domContainer);