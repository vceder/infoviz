export default {
  methods: {
    gameColor(n) {
      const colors = [
        "#3CDCA0",
        "#F7766F",
        "#9FFF70",
        "#9C78F8",
        "#F9CD80",
        "#8FCEFD",
        "#4FDFA9",
        "#A8FF7E",
        "#F7837D",
        "#9169F8",
        "#F9C872",
        "#83C9FD"
      ];
      return colors[n % colors.length];
    }
  }
};
