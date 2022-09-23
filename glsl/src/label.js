class _Label extends Event {}

const Label = {
    create: function(...args) {
        return new _Label(...args);
    }
};
