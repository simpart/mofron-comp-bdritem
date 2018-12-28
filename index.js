/**
 * @file   mofron-comp-bdritem/index.js
 * @author simpart
 */
const mf       = require('mofron');
const Text     = require('mofron-comp-text');
const MenuItem = require('mofron-comp-menuitem');
const efColor  = require('mofron-effect-color');
const Border   = require('mofron-effect-border');
const Hover    = require('mofron-event-hover');

mf.comp.BdrItem = class extends MenuItem {
    
    /**
     * initialize component
     * 
     * @param po paramter or option
     */
    constructor (po) {
        try {
            super();
            this.name('BdrItem');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @npte private method
     */
    initDomConts () {
        try {
            super.initDomConts();
            this.addChild(this.text());
            /* init config */
            this.effect([this.border()]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * item text setter/getter
     *
     * @param p1 (Text) set item text component
     * @param p1 (string) set item text
     * @param p1 (undefined) call as getter
     * @param return (Text) item text component
     */
    text (prm) {
        try {
            if ('string' === typeof prm) {
                this.text().execOption({
                    text  : prm,
                    style : [{'padding-left': '0.15rem'}, true]
                });
                return;
            } else if (true === mf.func.isComp(prm, 'Text')) {
                prm.execOption({
                    event : [
                        new Hover({ kickEffect : new efColor(['#000000', null]) })
                    ]
                });
            }
            return this.innerComp('text', prm, Text);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * item text size setter/getter
     *
     * @param p1 (string) text size (css size value)
     * @param p1 (undefined) call as getter
     * @return (string) text size
     */
    size (prm) {
        try { return this.text().size(prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * border setter/getter
     *
     * @param p1 (Border) border effect
     * @param p1 (undefined) call as getter
     * @return (Border) border effect
     */
    border (prm) {
        try {
            return this.member(
                'border',
                ['Effect','Border'],
                prm,
                new Border({
                    type    : 'left',
                    width   : '0.03rem',
                    status  : false,
                    suspend : [false, false]
                })
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * configure select/unselect style
     *
     * @param p1 (true) select item
     * @param p1 (false) unselect item
     * @note private method
     */
    select (flg) {
        try {
            super.select(flg);
            this.text().execOption({
                weight : (true === flg) ? 700 : 500
            });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * hover text color setter/getter
     *
     * @param p1 (string) hover text color (name,#hex,rgb)
     * @param p1 (array) hover text color ([r,g,b])
     * @param p1 (undefined) call as getter
     * @return (string) hover text color
     */
    accentColor (prm) {
        try {
            let ef_clr = this.text().effect('Color');
            if (undefined === prm) {
                /* getter */
                return ef_clr.color()[0];
            }
            /* setter */
            ef_clr.color(prm, ef_clr.color()[1]);
            this.effect('Border').color(prm, ef_clr.color()[1]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.BdrItem;
/* end of file */
