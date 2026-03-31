import React, { forwardRef } from "react";
import SpinnerIcon from "./icons/SpinnerIcon";

const LoadingModal = forwardRef((props, ref) => {
	return (
		<dialog id="my_modal_2" className="modal bg-black/70" ref={ref}>
			<div>
				<SpinnerIcon className="text-2xl animate-spin text-white" />
			</div>
		</dialog>
	);
});

export default LoadingModal;
