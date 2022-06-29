export default class HabitPresenter {
  constructor(habits, maxHabits) {
    this.habits = habits;
    this.maxHabits = maxHabits;
  }
  getHabits() {
    return this.habits;
  }
  increment(habit, update) {
    this.habits = this.habits.map((item) => {
      if (item.id === habit.id) {
        return { ...habit, count: habit.count + 1 };
      }
      return item;
    });
    update(this.habits);
  }
  decrement(habit, update) {
    this.habits = this.habits.map((item) => {
      if (item.id === habit.id) {
        const count = item.count - 1;
        return { ...habit, count: count < 0 ? 0 : count };
        //habit.count-1을 할 경우 return 하는 부분을 다음과 같이 바꿔도 { ...habit, count}; 테스트가 실패하지 않음(비정상)
        //this.habits의 오브젝트를 사용하도록 변경하면 테스트가 실패함(정상)
      }
      return item;
    });
    update(this.habits);
  }
  delete(habit, update) {
    this.habits = this.habits.filter((item) => item.id !== habit.id);
    update(this.habits);
  }
  add(name, update) {
    if (this.habits.length === this.maxHabits) {
      throw new Error(`습관의 갯수는 ${this.maxHabits} 이상이 될 수 없습니다.`);
    }
    this.habits = [...this.habits, { name, id: Date.now(), count: 0 }];
    update(this.habits);
  }
  reset(update) {
    this.habits = this.habits.map((habit) => {
      if (habit.count !== 0) {
        return { ...habit, count: 0 };
      }
      return habit;
    });
    update(this.habits);
  }
}
