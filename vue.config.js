module.exports = {
    css: {
      loaderOptions: {
        sass: {
          data: `
            @import "@/scss/variables.scss";
            @import "@/scss/main.scss";
          `
        }
      }
    }
};