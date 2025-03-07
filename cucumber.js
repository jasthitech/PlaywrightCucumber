module.exports = {
    default: {
        require: ["steps/*.ts", "features/**/*.ts", "support/**/*.ts"],
        format: ["progress-bar", "json:reports/cucumber_report.json"],
        publishQuiet: true,
        requireModule: ["ts-node/register"],
        tags: "@smoke"
    }
};
  
