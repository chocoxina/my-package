'use babel';



import { CompositeDisposable } from 'atom';



const END_TO_BREAK = /(?!^[#{1,6} |\s*\*\*|\s*\* |\s*\+ |\s*\-\s*].*)([^//])(\r\n)(?![\r*\n|#{1,6} |\s*\*\*|\s*\* |\s*\+ |\s*\-\s*])/g


function replace(editor) {

  const selectedText = editor.getSelectedText();



  if (typeof selectedText !== 'string') {

    return;

  }



  if (selectedText === '') {

    const replacedText = editor.getText().replace(END_TO_BREAK, '$1\\$2');

    editor.setText(replacedText);

  } else {

    const replacedText = selectedText.replace(END_TO_BREAK, '$1\\$2');

    editor.insertText(replacedText);

  }

}



export default {



  subscriptions: null,



  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable

    this.subscriptions = new CompositeDisposable();



    this.subscriptions.add(atom.commands.add('atom-text-editor', {

      'Markdown-Line-break:replace': () => replace(atom.workspace.getActiveTextEditor())

    }));

  },



  deactivate() {

    this.subscriptions.dispose();

  }

};
