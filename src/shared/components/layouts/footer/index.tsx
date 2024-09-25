import "./footer.scss";

import { Box } from "@/shared/components/layouts/box";
import { Flex } from "@/shared/components/layouts/flex";
import { Separator } from "@/shared/components/ui/separator";
import { Text } from "@/shared/components/ui/text";

type TextBoxProps = {
  label?: string;
  text?: string;
};
const TextBox = ({ label, text }: TextBoxProps) => {
  return (
    <Flex align="center" gap="2">
      <Text as="span" variant="body1_normal" weight="bold" color="var(--gray-070)">
        {label}
      </Text>
      <Text as="span" variant="label1_reading" weight="regular" color="var(--gray-050)">
        {text}
      </Text>
    </Flex>
  );
};
export default function Footer() {
  return (
    <footer className="footer">
      <Flex justify="between">
        <Flex asChild direction="column" gap="3">
          <address>
            <Flex gap="3" align="center">
              <TextBox label="비법거래소" />
              <Separator orientation="vertical" />
              <TextBox label="사업자번호" text="495-59-00604" />
              <Separator orientation="vertical" />
              <TextBox label="대표" text="민윤기" />
            </Flex>
            <Flex gap="2">
              <TextBox label="통신판매업신고" text="2023-서울서초-1234" />
              <TextBox label="대표번호" text="1688-8078" />
            </Flex>
            <TextBox label="주소" text="경기도 용인시 수지구 현암로 148, 602호 (비법거래소)" />
          </address>
        </Flex>
        <Flex direction="column" gap="14px">
          <TextBox label="비법거래소 APP Download" />
          <Flex gap="3">
            <a href="https://apps.apple.com" title="비법거래소 iOS 앱 다운로드">
              <img src="apple-store-icon.png" alt="Apple App Store" />
            </a>
            <a href="https://play.google.com" title="비법거래소 Android 앱 다운로드">
              <img src="google-play-icon.png" alt="Google Play Store" />
            </a>
          </Flex>
        </Flex>
      </Flex>

      <Box asChild my="20px" mb="5">
        <Separator orientation="horizontal" />
      </Box>

      <Text as="p" variant="caption1" weight="regular" color="#9F9F9F">
        비법거래소는 통신판매중개시스템의 제공자로서 통신판매의 당사자가 아닙니다. 콘텐츠 생산, 환불
        등과 관련한 의무와 책임은 판매자에게 있습니다.
      </Text>

      <Flex gap="6" mt="3">
        <Text variant="body1_reading" weight="regular" color="var(--gray-050)" asChild>
          <a href="/terms-of-service" title="이용약관">
            이용약관
          </a>
        </Text>
        <Text variant="body1_normal" weight="bold" color="var(--gray-070)" asChild>
          <a href="/privacy-policy" title="개인정보처리방침">
            개인정보처리방침
          </a>
        </Text>
        <Text variant="body1_reading" weight="regular" color="var(--gray-050)" asChild>
          <a href="/customer-service" title="비법거래소 고객센터">
            비법거래소 고객센터
          </a>
        </Text>
        <Text variant="body1_reading" weight="regular" color="var(--gray-050)" asChild>
          <a href="/kakao-inquiry" title="카카오톡 1:1 문의">
            카카오톡 1:1 문의
          </a>
        </Text>
        <Text variant="body1_reading" weight="regular" color="var(--gray-050)" asChild>
          <a href="/partnership" title="제휴제안">
            제휴제안
          </a>
        </Text>
      </Flex>
    </footer>
  );
}
