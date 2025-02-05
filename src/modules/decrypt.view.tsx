"use client";

import { dataToBytes } from "@/lib/decrypt";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import style from "./style.module.scss";
import { IoCopy } from "react-icons/io5";
import { copyItem } from "@/lib/copy.help";
import FooterModule from "./footer.ui";
import { decrypt } from "@/lib/encryption";

type formProps = { msg: string; password: string; };
const DecryptModuleView = () => {
  const copyRef = useRef<HTMLParagraphElement | null>( null );
  const [ displayEncrptedData, setDisplayEncryptedData ] = useState<string | null>( null );
  const { register, handleSubmit, formState: { isDirty, isValid } } = useForm<formProps>( { mode: "all", } );
  const handleDataDecryption = useCallback( async ( data: formProps ) => {
    try {
      const emojiToBytes = dataToBytes( data.msg );
      const dataDecrypt = await decrypt( emojiToBytes, data.password );
      setDisplayEncryptedData( dataDecrypt );
    } catch ( error ) {
      console.log( 'error: ', error );

    }
  }, [] );
  return ( <div className={ style.layout }>
    <div className={ style.output }>
      <div className={ style.form__title }>    <h2 className={ style.title }> Decrypt Output</h2>
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
      handleDataDecryption( data );
    } ) } >
      <label >
        Message to Decrypt
        <textarea placeholder="input your secret msg here" className={ style.form__input } { ...register( "msg", { required: true } ) } />
      </label>
      <label >
        Secrete Password
        <input placeholder="secrete password" className={ style.form__input } { ...register( "password", { required: true } ) } type="password" />
      </label>
      {/* formState: { isDirty, isValid } */ }
      <button disabled={ !isDirty || !isValid } type="submit">Decrypt</button>
    </form>
    <FooterModule />
  </div> );
};

export default DecryptModuleView;
