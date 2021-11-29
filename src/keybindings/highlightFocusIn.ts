import { ILSPluginUser, BlockEntity } from '@logseq/libs/dist/LSPlugin';
import { debug, getCurrentBlockUUID, scrollToBlockInPage, setLastBlockUUID } from '../common/funcs';

export default (logseq: ILSPluginUser) => {
  logseq.App.registerCommandPalette({
    key: 'vim-shortcut-highlightFocusIn',
    label: 'Highlight focus in',
    keybinding: {
      mode: 'non-editing',
      binding: 'shift+l'
    }
  }, async () => {
    debug('Highlight focus in');

    const page = await logseq.Editor.getCurrentPage();
    if (page?.name) {
      let blockUUID = await getCurrentBlockUUID();
      if (blockUUID) {
        let block = await logseq.Editor.getBlock(blockUUID);
        console.log('block', block);
        if (block?.children && block?.children?.length > 0) {
          let focusInBlock = block.children[block.children.length - 1];
          if (Array.isArray(focusInBlock) && focusInBlock[0] === 'uuid') {
            scrollToBlockInPage(page.name, focusInBlock[1]);

            console.log('focusInBlock[1]', focusInBlock[1]);
          }

        }
      }
    }

  });
};