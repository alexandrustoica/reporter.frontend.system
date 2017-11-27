import {COLOR_LIGHT_BLUE} from "../../styles/Colors";
import {Icon, IconType} from "../shape/Icon";
import {Screen} from "../decorators/Screen";
import {CenterContainer} from "../container/CenterContainer";
import {CenterObject} from "../decorators/CenterObject";
import * as React from "react";
import {SpaceProvider} from "../other/SpaceProvider";
import {SystemInformationText} from "../text/SystemInformationText";
import {Circle} from "../shape/Circle";


export const EmptyListDisplayed = ({cause, solution, color = COLOR_LIGHT_BLUE, icon = IconType.DONE_ICON_HUGE}) =>
	<Screen>
		<CenterContainer>
			<CenterObject>
				<Circle radius={70} color={color}>
					<Icon url={icon} size={{width: 10 * 5, height: 8 * 5}}/>
				</Circle>
			</CenterObject>
			<SpaceProvider height={20}/>
			<SystemInformationText>{cause}</SystemInformationText>
			<SystemInformationText>{solution}</SystemInformationText>
		</CenterContainer>
	</Screen>