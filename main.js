if (process.env.NODE_ENV === 'development') {
  require('./index.html')
};


window.Vue = function (params) {
  console.log(params.data, 'params')
  this._init(params);
};

Vue.prototype._init = function (params) {
  this.$el = document.querySelector(params.el);
  this.$data = params.data;
  this.$methods = params.methods;

  this._binding = {}
  this._observer(this.$data);
  this._complie(this.$el)
};

Vue.prototype._observer = function (options) {
  for (let item in options) {
    if (options.hasOwnProperty(item)) {
      this._binding[item]={
        _directives : []
      }
      let value = options[item];
      if (typeof value === 'object') {
        this._observer(value)
      } 
        //此步骤做到从 M ==> V
        Object.defineProperty(options, item, {
          enumerable: true,
          configurable: true,
          get() {
            return value
          },
          set: (newValue) => {
            if (value !== newValue) {
              value = newValue;
              this._binding[item]._directives
              .map( (ele,index) => {
                ele._update();
              })
            }
          }
        })
      
    }
  }
};

Vue.prototype._complie = function (root) {
  const _nodes = Array.prototype.slice.call(root.children);
  for (let i of _nodes) {
    if (i.children.length) {
      this._complie(i)
    }
    //开始解析指令
    // v-click指令
    if (i.hasAttribute('v-click')) {
      i.onclick = (() => {
        return this.$methods[i.getAttribute('v-click')].bind(this.$data)
      })()
    };

    // v-model 指令
    if (i.hasAttribute('v-model') && (i.tagName === 'INPUT' || i.tagName === 'TEXTAREA')) {
      i.addEventListener('input',  (() => {
        const attrValue = i.getAttribute('v-model');
        this._binding[attrValue]._directives.push(
          new Watch({
            el_type: 'input',
            el: i,
            vm: this,
            attr: attrValue,
            exp: 'value'
          })
        );
        return () => {
          this.$data[attrValue] = i.value;
        }
      })())

    };

    // v-bind指令
    if(i.hasAttribute('v-bind')){
      const bindValue = i.getAttribute('v-bind')
      this._binding[bindValue]._directives.push(new Watch(
        {
          el_type:'all',
          el: i,
          vm: this,
          attr: bindValue,
          exp: 'innerHTML'
        }
      ))
    }

  }

  // _nodes.map( (ele,index) => {

  // });
}

window.Watch = function (optiong) {
  this.dir_name = optiong.el_type;
  this.el = optiong.el;
  this.vm = optiong.vm;
  this.attr = optiong.attr;
  this.exp = optiong.exp;

  this._update()
};

Watch.prototype._update = function () {
  this.el[this.exp] = this.vm.$data[this.attr];
}