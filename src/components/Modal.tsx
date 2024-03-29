import { createPortal } from "preact/compat";
import { Button } from "./Button"
import { JSX } from "preact";

interface ModalProps {
	titleModal: string,
	isOpen: boolean,
	onClose: (event: MouseEvent) => void,
	onSubmit: (event: SubmitEvent) => void,
	children: JSX.Element | JSX.Element[] | string
}

export function Modal(props: ModalProps) {
	const { titleModal, children, isOpen, onClose, onSubmit } = props

	if (!isOpen) return null

	return (
		createPortal(
			<div className="relative z-50" >
				<div className="fixed inset-0 bg-black/30" aria-hidden="true">
					<div className="fixed inset-0 overflow-auto">
						<div className="flex h-auto items-center justify-center sm:p-4">
							<form onSubmit={(e) => onSubmit(e)} className="flex flex-col w-full sm:w-auto h-auto gap-8 rounded p-8 bg-white dark:bg-gray-900 shadow-md">
								<head className="w-full font-bold text-xl text-gray-800 dark:text-white flex justify-center items-center">
									{titleModal}
								</head>
								<div className="flex flex-col justify-center grow gap-4 w-full h-full">
									{children}
								</div>
								<footer className="flex w-full justify-between">
									<Button className="bg-red-500" type="button" title="Cerrar modal" onClick={onClose} >
										Cerrar
									</Button>
									<Button type="submit" title={titleModal}>Aceptar</Button>
								</footer>
							</form>
						</div>
					</div>
				</div>
			</div>, document.getElementById('portal') as HTMLDivElement)
	)
}
