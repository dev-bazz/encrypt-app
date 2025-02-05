"use client";

import { convertToEmoji } from "@/lib/decrypt";
import { encrypt } from "@/lib/encryption";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import style from "./style.module.scss";
import { IoCopy } from "react-icons/io5";
import { copyItem } from "@/lib/copy.help";
import FooterModule from "./footer.ui";

type formProps = { msg: string; password: string; };
const EncryptModuleView = () => {
  const copyRef = useRef<HTMLParagraphElement | null>( null );
  const [ displayEncrptedData, setDisplayEncryptedData ] = useState<string | null>( null );
  const { register, handleSubmit, formState: { isDirty, isValid } } = useForm<formProps>( { mode: "all", } );
  const handleDataEncryption = useCallback( async ( data: formProps ) => {
    const enptyedData = await encrypt( data.msg, data.password );
    const emoji = await convertToEmoji( enptyedData );
    setDisplayEncryptedData( emoji );
    console.log( 'emoji: ', emoji );
  }, [] );
  return ( <div className="">
    <div className={ style.output }>
      <div className={ style.form__title }>    <h2 className={ style.title }>Encrypt Out</h2>
        <IoCopy onClick={ () => {
          if ( copyRef.current && displayEncrptedData ) {
            copyItem( copyRef.current.innerText );
          }
        } } /></div>
      <p ref={ copyRef }>      { displayEncrptedData && displayEncrptedData }
      </p>
    </div>
    <form className={ style.form } onSubmit={ handleSubmit( ( data ) => {
      console.log( 'data: ', data );
      handleDataEncryption( data );
    } ) } >
      <label >
        Message to Encrypt
        <textarea placeholder="input your secret msg here" className={ style.form__input } { ...register( "msg", { required: true } ) } />
      </label>
      <label >
        Secrete Password
        <input placeholder="secrete password" className={ style.form__input } { ...register( "password", { required: true } ) } type="password" />
      </label>
      {/* formState: { isDirty, isValid } */ }
      <button disabled={ !isDirty || !isValid } type="submit">Encrypt</button>
    </form>
    <FooterModule />
  </div> );
};

export default EncryptModuleView;
