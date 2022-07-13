import HabitPresenter from "../habit_presenter";

describe("HabitPresenter", () => {
  let presenter;
  let update;
  //테스트 목적으로 배열에 접근해야할 수 있으므로 바깥에 정의
  const habits = [
    { id: 1, name: "Reading", count: 1 },
    { id: 2, name: "Running", count: 0 },
  ];
  beforeEach(() => {
    presenter = new HabitPresenter(habits, 5);
    update = jest.fn();
  });
  it("inits with habits", () => {
    expect(presenter.getHabits()).toEqual(habits);
  });
  it("increments habit count", () => {
    presenter.increment(habits[0], update);
    expect(presenter.getHabits()[0].count).toBe(2);
    checkUpdateIsCalled();
  });
  it("decrements habit count", () => {
    presenter.decrement(habits[0], update);
    expect(presenter.getHabits()[0].count).toBe(0);
    checkUpdateIsCalled();
  });
  it("does not set the count value below 0 when decrements", () => {
    //update는 mocking 했기 때문에 실제로 state가 업데이트 되지 않고 그대로임
    presenter.decrement(habits[0], update);
    presenter.decrement(habits[0], update);
    expect(presenter.getHabits()[0].count).toBe(0);
  });
  it("deletes habit from the list", () => {
    presenter.delete(habits[0], update);
    expect(presenter.getHabits().length).toBe(1);
    expect(presenter.getHabits()[0].name).toBe("Running");
    checkUpdateIsCalled();
  });
  it("adds new habit to the list", () => {
    presenter.add("Eating", update);
    expect(presenter.getHabits()[2].name).toBe("Eating");
    expect(presenter.getHabits()[2].count).toBe(0);
    checkUpdateIsCalled();
  });
  it("throws an error when the max habits limit is exceeded", () => {
    presenter.add("Eating", update);
    presenter.add("Studying", update);
    presenter.add("Jogging", update);
    expect(() => presenter.add("Eating", update)).toThrow(
      `습관의 갯수는 5 이상이 될 수 없습니다.`
    );
  });
  describe("reset", () => {
    it("set all habit counts to 0", () => {
      presenter.reset(update);
      expect(presenter.getHabits()[0].count).toBe(0);
      expect(presenter.getHabits()[1].count).toBe(0);
      checkUpdateIsCalled();
    });
    it("does not create new object when count is 0", () => {
      const habits = presenter.getHabits();
      presenter.reset(update);
      const updateHabits = presenter.getHabits();
      expect(updateHabits[1]).toBe(habits[1]);
    });
  });
  function checkUpdateIsCalled() {
    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith(presenter.getHabits());
  }
});
