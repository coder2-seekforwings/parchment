import FormatBlot from './abstract/format';
import InlineBlot from './inline';
import LeafBlot from './abstract/leaf';
import LinkedList from '../collection/linked-list';
import ParentBlot from './abstract/parent';
import * as Registry from '../registry';


type ChildBlot = BlockBlot | InlineBlot | LeafBlot;

class BlockBlot extends FormatBlot {
  static blotName = 'block';
  static scope = Registry.Scope.BLOCK & Registry.Scope.BLOT;
  static tagName = 'P';

  children: LinkedList<ChildBlot>;

  format(name: string, value: any): void {
    if (Registry.match(name, this.statics.scope) != null) {
      if (value) {
        this.replaceWith(name, value);
      } else {
        this.replaceWith(BlockBlot.blotName, true);
      }
    } else {
      super.format(name, value);
    }
  }

  getFormat(): Object {
    let format = super.getFormat();
    if (this.statics.blotName === BlockBlot.blotName) delete format[BlockBlot.blotName];
    return format;
  }

  insertBefore(childBlot: ChildBlot, refBlot?: ChildBlot): void {
    super.insertBefore(childBlot, refBlot);
  }
}


export default BlockBlot;
