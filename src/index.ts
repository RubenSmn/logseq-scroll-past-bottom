import "@logseq/libs";
import { logseq as PL } from "../package.json";

const settings = [
  {
    key: "percentage",
    default: "50",
    description: "The percentage (%) between 0 and 100",
    title: "The percentage of extra scroll room",
    type: "number",
    inputAs: "range",
  },
  {
    key: "lastLineVisible",
    default: false,
    description:
      "Whether to still see the last line of the page on 100% over scroll",
    title: "Show the last line of the page",
    type: "boolean",
  },
];

// journal page with date of today there is a extra div for queries
const todayQueriesHeight = "2px - 2.5rem";
// height of the toolbar
const toolbarHeight = "48px";
// offset for "Unlinked References"
const lastLineOffset = "6rem";

const onSettingsChange = () => {
  const percentage = (logseq.settings?.percentage || 50) + "vh";
  const lastLineVisible = logseq.settings?.lastLineVisible || false;

  const offset = lastLineVisible
    ? `calc(${lastLineOffset} + ${toolbarHeight})`
    : "0vh";

  logseq.provideStyle({
    key: PL.id + "-vars",
    style: `:root { --ls-scroll-past-bottom-percentage: ${percentage}; --ls-scroll-past-bottom-offset: ${offset} }`,
  });
};

const main = () => {
  onSettingsChange();
  logseq.onSettingsChanged(onSettingsChange);

  logseq.provideStyle({
    key: PL.id,
    style: `
      .cp__sidebar-main-content > div:not(:has(#global-graph)) {
        padding-bottom: max(0vh, calc(var(--ls-scroll-past-bottom-percentage) - var(--ls-scroll-past-bottom-offset)));
      }

      .cp__sidebar-main-content > div:not(:has(#global-graph)):has(#today-queries) {
        padding-bottom: max(0vh, calc(var(--ls-scroll-past-bottom-percentage) - ${todayQueriesHeight} - var(--ls-scroll-past-bottom-offset)));
      }
    `,
  });
};

logseq.useSettingsSchema(settings).ready(main).catch(console.error);
