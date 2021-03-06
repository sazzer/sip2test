var util = require("util");

/**
 * Datatype representation for a String type
 * @constructor
 */
function StringType() {
    Object.defineProperties(this, {
        minLength: {
            enumerable: true,
            writable: true,
            value: undefined
        },
        maxLength: {
            enumerable: true,
            writable: true,
            value: undefined
        },
        enumeratedOptions: {
            enumerable: true,
            writable: true,
            value: undefined
        }
    });
}

StringType.prototype = {
    /**
     * Format up the provided value
     * @param v {String} The value to format
     * @return {String} the formatted value
     */
    format: function(v) {
        return v;
    },
    /**
     * Parse the given string as a string
     * @param v {String} The value to parse
     * @return {String} the parsed value
     */
    parse: function(v) {
        return v;
    },
    /**
     * Validate the provided value is correct for this data type
     * @param v {Any} the value to validate
     * @return any validation errors
     */
    validateInput: function(v) {
        var errors = [];
        if (typeof(v) !== "string") {
            errors.push({
                key: "type_mismatch",
                message: util.format("Value is of incorrect type. Expected 'string' but got '%s'",
                    typeof(v))
            });
        } else {
            // It's a String, so check everything else about it
            if (this.minLength !== undefined && v.length < this.minLength) {
                errors.push({
                    key: "min_length",
                    message: util.format("Value is too short. Min Length is %d but value is %d", 
                        this.minLength, v.length)
                });
            }
            if (this.maxLength !== undefined && v.length > this.maxLength) {
                errors.push({
                    key: "max_length",
                    message: util.format("Value is too long. Max Length is %d but value is %d", 
                        this.maxLength, v.length)
                });
            }
            if (this.enumeratedOptions !== undefined && this.enumeratedOptions.indexOf(v) == -1) {
                errors.push({
                    key: "enumerated_option",
                    message: "Value is not in the list of acceptable values"
                });
            }
        }
        return errors;
    },
    withMinLength: function(v) {
        this.minLength = v;
        return this;
    },
    withoutMinLength: function() {
        this.minLength = undefined;
        return this;
    },
    withMaxLength: function(v) {
        this.maxLength = v;
        return this;
    },
    withoutMaxLength: function() {
        this.maxLength = undefined;
        return this;
    },
    withLength: function(min, max) {
        this.withMinLength(min);
        if (max === undefined) {
            this.withMaxLength(min);
        } else {
            this.withMaxLength(max);
        }
        return this;
    },
    withEnumeratedOption: function(v) {
        if (!this.enumeratedOptions) {
            this.enumeratedOptions = [];
        }
        this.enumeratedOptions.push(v);
        return this;
    },
    withEnumeratedOptions: function(v) {
        this.enumeratedOptions = v;
        return this;
    },
    withoutEnumeratedOptions: function(v) {
        this.enumeratedOptions = undefined;
        return this;
    }
};

module.exports = StringType;
