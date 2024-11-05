import { webpack } from "replugged";
import { Button, Flex, SwitchItem, Text } from "replugged/components";
import { SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";
import Types from "../types";

export default ({
  folderId,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  folderId: string;
}): React.ReactElement => {
  const ImageInputWrapper = webpack.getFunctionBySource<Types.ImageInput["default"]>(
    Modules.ImageInput ?? {},
    "this.handleFileChange",
  );
  const [iconType, setIconType] = Utils.useSettingArray(
    SettingValues,
    `folderData.${folderId}.iconType`,
    "default",
  );
  const [closedstate, setClosedState] = Utils.useSettingArray(
    SettingValues,
    `folderData.${folderId}.closedIcon`,
    "",
  );
  const [openstate, setOpenState] = Utils.useSettingArray(
    SettingValues,
    `folderData.${folderId}.openIcon`,
    "",
  );
  return ImageInputWrapper ? (
    <div {...props}>
      {SettingValues.get("sidebar", defaultSettings.sidebar) && (
        <SwitchItem
          {...Utils.useSetting(SettingValues, `sidebarBlacklist.${folderId}`, false as boolean)}
          note="If you would like to blacklist the folder from appearing in the seperate sidebar.">
          Sidebar Blacklist
        </SwitchItem>
      )}
      <SwitchItem
        value={iconType === "custom"}
        onChange={(e) => (e ? setIconType("custom") : setIconType("default"))}
        note="If you would like to use custom icons for this folder.">
        Custom Icons
      </SwitchItem>
      {iconType === "custom" ? (
        <Flex
          align={Flex.Align.CENTER}
          style={{
            marginTop: "6px",
            gap: "6px",
            minWidth: "550px",
          }}>
          <Flex
            align={Flex.Align.CENTER}
            direction={Flex.Direction.VERTICAL}
            style={{
              gap: "6px",
            }}>
            <Text.Eyebrow>Closed Icon</Text.Eyebrow>
            {closedstate ? (
              <div
                key={closedstate}
                style={{
                  backgroundImage: `url(${closedstate})`,
                  width: "152px",
                  height: "152px",
                  borderRadius: "10px",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
            ) : null}
            {closedstate ? (
              <Flex
                align={Flex.Align.CENTER}
                style={{
                  marginTop: "6px",
                  gap: "6px",
                }}>
                <Button
                  color={Button.Colors.WHITE}
                  look={Button.Looks.OUTLINED}
                  onClick={() => setClosedState("")}>
                  Remove Icon
                </Button>
                <Button color={Button.Colors.WHITE} look={Button.Looks.OUTLINED}>
                  Change Icon
                  <ImageInputWrapper
                    onChange={(img: string) => {
                      setClosedState(img);
                    }}
                  />
                </Button>
              </Flex>
            ) : (
              <Button color={Button.Colors.WHITE} look={Button.Looks.OUTLINED}>
                Add Icon
                <ImageInputWrapper
                  onChange={(img: string) => {
                    setClosedState(img);
                  }}
                />
              </Button>
            )}
          </Flex>
          <Flex
            align={Flex.Align.CENTER}
            direction={Flex.Direction.VERTICAL}
            style={{
              gap: "6px",
            }}>
            <Text.Eyebrow>Open Icon</Text.Eyebrow>
            {openstate ? (
              <div
                key={openstate}
                style={{
                  backgroundImage: `url(${openstate})`,
                  width: "152px",
                  height: "152px",
                  borderRadius: "10px",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
            ) : null}
            {openstate ? (
              <Flex
                align={Flex.Align.CENTER}
                style={{
                  marginTop: "6px",
                  gap: "6px",
                }}>
                <Button
                  color={Button.Colors.WHITE}
                  look={Button.Looks.OUTLINED}
                  onClick={() => setOpenState("")}>
                  Remove Icon
                </Button>
                <Button color={Button.Colors.WHITE} look={Button.Looks.OUTLINED}>
                  Change Icon
                  <ImageInputWrapper
                    onChange={(img: string) => {
                      setOpenState(img);
                    }}
                  />
                </Button>
              </Flex>
            ) : (
              <Button color={Button.Colors.WHITE} look={Button.Looks.OUTLINED}>
                Add Icon
                <ImageInputWrapper
                  onChange={(img: string) => {
                    setOpenState(img);
                  }}
                />
              </Button>
            )}
          </Flex>
        </Flex>
      ) : null}
    </div>
  ) : null;
};
