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
];

const onSettingsChange = () => {
  let percentage = (logseq.settings?.percentage ?? 50) + "vh";

  logseq.provideStyle({
    key: PL.id + "-vars",
    style: `:root { --ls-scroll-past-bottom-percentage: ${percentage}; }`,
  });
};

const main = () => {
  onSettingsChange();
  logseq.onSettingsChanged(onSettingsChange);

  logseq.provideStyle({
    id: PL.id,
    style: `
    .cp__sidebar-main-content > div {
      padding-bottom: var(--ls-scroll-past-bottom-percentage);
    }
`,
  });
};

logseq.useSettingsSchema(settings).ready(main).catch(console.error);
