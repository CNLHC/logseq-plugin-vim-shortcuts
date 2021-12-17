import { ILSPluginUser } from '@logseq/libs/dist/LSPlugin';
import { debug, getSettings } from '../common/funcs';

export default (logseq: ILSPluginUser) => {
  const settings = getSettings();

  logseq.App.registerCommandPalette({
    key: 'vim-shortcut-undo',
    label: 'Undo',
    keybinding: {
      mode: 'non-editing',
      binding: settings.undo
    }
  }, async () => {
    debug('Undo');

    // @ts-ignore
    await logseq.App.invokeExternalCommand('logseq.editor/undo');
    await logseq.Editor.exitEditingMode(true);
  });
};
