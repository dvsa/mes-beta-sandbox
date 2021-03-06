import { JournalModel } from '../../pages/journal/journal.model';
import { AppInfoModel } from '../../modules/app-info/app-info.model';
import { LogsModel } from '../../modules/logs/logs.model';

export type StoreModel = {
  journal: JournalModel,
  appInfo: AppInfoModel,
  logs: LogsModel,
};
