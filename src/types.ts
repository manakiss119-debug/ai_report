export interface TabInfo {
  id: string;
  label: string;
}

export interface ManualContent {
  tabs: TabInfo[];
  equipment: string[];
  procedure: string[];
  input: {
    text: string;
  };
  rep_point?: {
    text: string;
    procedure: string[];
  };
}

export interface ManualData {
  [key: string]: ManualContent;
}
