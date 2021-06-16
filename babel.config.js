module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "prismjs",
      {
        languages: [
          "javascript",
          "c",
          "css",
          "html",
          "cypher",
          "sql",
          "bash",
          "csharp",
          "cpp",
          "dart",
          "diff",
          "docker",
          "go",
          "graphql",
          "java",
          "json",
          "latex",
          "python",
          "ruby"
        ],
        plugins: ["line-numbers"],
        theme: "okaidia",
        css: true
      }
    ]
  ]
};
