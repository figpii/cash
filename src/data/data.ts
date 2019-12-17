
// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/get_data.ts
// @require ./helpers/set_data.ts

interface Cash {
  data (): plainObject | undefined;
  data ( name: string ): any;
  data ( name: string, value: any ): this;
  data ( datas: plainObject ): this;
}

function data ( this: Cash ): plainObject | undefined;
function data ( this: Cash, name: string ): any;
function data ( this: Cash, name: string, value: any ): Cash;
function data ( this: Cash, name: plainObject ): Cash;
function data ( this: Cash, name?: string | plainObject, value?: any ) {

  if ( !name ) {

    if ( !this[0] ) return;

    const datas: { [data: string]: any } = {};

    for ( const key in this[0].dataset ) {

      datas[key] = getData ( this[0], key );

    }

    return datas;

  }

  if ( isString ( name ) ) {

    if ( arguments.length < 2 ) return this[0] && getData ( this[0], name );

    return this.each ( ( i, ele ) => { setData ( ele, name, value ) } );

  }

  for ( const key in name ) {

    this.data ( key, name[key] );

  }

  return this;

}

fn.data = data;
