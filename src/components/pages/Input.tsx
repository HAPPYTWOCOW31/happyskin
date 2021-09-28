import React, { useState } from 'react';
import tw from 'twin.macro';
import axios from 'axios';
import { css } from 'styled-components';
import { playerDB } from './settings';

export function Input({
    initial,
    name,
    display,
    uuid,
}: {
    initial: string;
    name: string;
    display: string;
    uuid: string;
}) {
    const [value, setValue] = useState(initial);
    let textInput = React.createRef<HTMLInputElement>();

    return (
        <form
            css={tw`w-full m-4`}
            onSubmit={async (e) => {
                e.preventDefault();

                const data: playerDB = (
                    await axios
                        .get('https://playerdb.co/api/player/minecraft/' + value)
                        .catch((error) => error.response)
                ).data;
                if (data.success) {
                    localStorage.setItem(name, data.data.player.id!);
                    window.location.reload();
                } else {
                    alert('Error, Invalid Username / UUID');
                }
            }}
        >
            <label css={tw`w-full text-2xl my-1`}>
                <div css={tw`text-center`}>{display}</div>
            </label>
            <div css={tw`flex flex-row`}>
                <div
                    css={css`
                        ${tw`w-max inline-block rounded-sm my-auto overflow-hidden`}
                        .default {
                            display: block;
                        }

                        .overlay {
                            display: none;
                        }

                        :hover {
                            .default {
                                display: none;
                            }

                            .overlay {
                                display: block;
                            }
                        }
                    `}
                >
                    <img
                        className={'default'}
                        alt={'User Icon'}
                        src={'https://crafatar.com/avatars/' + uuid}
                        css={tw`h-10 w-10`}
                    />
                    <img
                        className={'overlay'}
                        alt={'User Icon'}
                        src={'https://crafatar.com/avatars/' + uuid + '?overlay'}
                        css={tw`h-10 w-10`}
                    />
                </div>
                <input
                    ref={textInput}
                    type={'text'}
                    value={value}
                    onChange={() => setValue(textInput.current?.value ?? 'da8a8993-adfa-4d29-99b1-9d0f62fbb78d')}
                    css={tw`h-10 py-2 px-2 rounded-md hover:outline-none focus:outline-none mx-3`}
                />
                <input
                    type="submit"
                    css={tw`px-3 py-2 h-10 rounded-md bg-gray-300 hover:cursor-pointer hover:outline-none focus:outline-none`}
                    value={'Update Skin'}
                />
            </div>
        </form>
    );
}
